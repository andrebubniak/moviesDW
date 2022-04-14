from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/movies'
CORS(app)

db = SQLAlchemy(app)


#tabela do banco
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    director = db.Column(db.String(255), nullable=False)
    synopsis = db.Column(db.String(255), nullable=True)

    def json_serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'director': self.director,
            'synopsis': self.synopsis,
        }

@app.route('/api/movies')
def get_movies():

    movies = Movie.query.all()

    #pega o parametro ?title no path
    if(request.args.get('title') is not None):
        movies = Movie.query.filter(Movie.title.like('%' + request.args.get('title') + '%')).all()

    output = []
    for movie in movies:
        output.append(movie.json_serialize())
    
    return jsonify(output)


@app.route('/api/movies/<id>')
def get_movie_by_id(id):
    movie = Movie.query.get_or_404(id)
    return movie.json_serialize()


@app.route('/api/movies', methods=['POST'])
def add_movie():
    movie = Movie(
        title =  request.json['title'],
        director = request.json['director'],
        synopsis = request.json['synopsis'],
    )

    db.session.add(movie)
    db.session.commit()
    return movie.json_serialize()


@app.route('/api/movies/<id>', methods=['PUT'])
def update_movie(id):

    movie = Movie.query.get_or_404(id)
    
    movie.title =  request.json['title'],
    movie.director = request.json['director'],
    movie.synopsis = request.json['synopsis'],
    
    db.session.commit()
    return movie.json_serialize()


@app.route('/api/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.query.get_or_404(id)

    db.session.delete(movie)
    db.session.commit()
    return {'deleted': movie.json_serialize()}

    
@app.route('/api/movies', methods=['DELETE'])
def delete_all_movies():
    db.session.query(Movie).delete()
    db.session.commit()
    return Response(status=200,content_type="application/json")
    