from flask import Flask, jsonify, make_response, request
from flask.helpers import send_from_directory
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow import fields
from flask_cors import CORS, cross_origin
from sqlalchemy.pool import QueuePool

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://bcc02a2046fefa:29a72846@us-cdbr-east-05.cleardb.net/heroku_6c5b65b85a2f35e'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
db = SQLAlchemy(app, engine_options={"pool_size": 10, "poolclass":QueuePool, "pool_pre_ping":True})

class Blog(db.Model):
    __tablename__ = "blogs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    author = db.Column(db.String(50))
    body = db.Column(db.String(1000))
    created = db.Column(db.Time)

    def create(self):
      db.session.add(self)
      db.session.commit()
      return self
    def __init__(self,title,author,body, created):
        self.title = title
        self.author = author
        self.body = body
        self.created = created
    def __repr__(self):
        return '' % self.id

db.create_all()

class BlogSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Blog
        sqla_session = db.session
        load_instance = True

    id = fields.Number(dump_only=True)
    title = fields.String(required=True)
    author = fields.String(required=True)
    body = fields.String(required=True)
    created = fields.DateTime(required=True)

@app.route('/blogs', methods=['GET', 'POST'])
@cross_origin()
def blogs():
    if request.method == 'GET':
        blogs_instance = Blog.query.all()
        product_schema = BlogSchema(many=True)
        blogs = product_schema.dump(blogs_instance)
        return make_response(jsonify({"blogs": blogs}))
    
    if request.method == "POST":
        blog_created = datetime.now()
        data = request.get_json()
        blog_schema = BlogSchema()
        blog = blog_schema.load({**data, 'created': str(blog_created)})
        blog.create()
        result = blog_schema.dump(blog)
        return make_response(jsonify(result), 201)

    return make_response(jsonify({}), 404)

@app.route('/blogs/<id>', methods=['GET', 'PATCH', 'DELETE'])
@cross_origin()
def update_blogs(id):
    if request.method == "GET":
        blog = Blog.query.get(id)

        if not blog:
            return make_response("No blog with the given id exists.", 404)

        blog_schema = BlogSchema()
        serialized_blog = blog_schema.dump(blog)
        return make_response(jsonify(serialized_blog), 200)

    if request.method == "PATCH":
        data = request.get_json()
        blog = Blog.query.get(id)

        if not blog:
            return make_response("No blog with the given id exists.", 404)

        if data.get('title'):
            blog.title = data['title']
        if data.get('author'):
            blog.author = data['author']
        if data.get('body'):
            blog.body = data['body']
 
        db.session.add(blog)
        db.session.commit()

        blog_schema = BlogSchema()
        updated_blog = blog_schema.dump(blog)
        return make_response(jsonify(updated_blog), 201)
    
    if request.method == "DELETE":
        blog = Blog.query.get(id)

        if not blog:
            return make_response("No blog with the given id exists.", 404)

        db.session.delete(blog)
        db.session.commit()
        return make_response("", 204)
    
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)