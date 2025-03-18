import os
from flask import Flask, render_template, jsonify, request
from slugify import slugify
from flask_swagger_ui import get_swaggerui_blueprint
app = Flask(__name__, static_folder="static")  # static_folder ni belgilash
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB gacha ruxsat berish

SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"  # JSON faylda API tavsifi bo‘ladi
swagger_ui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL) 
def read_articles() :
	articles = os.listdir("articles")
	slug_articles = {}
	for article in articles:
		slug = slugify(article)
		slug_articles[slug] = article
	return slug_articles

blog_posts = []

for year in blog_posts:
    for month in year["months"]:
        for post in month["posts"]:
            post["slug"] = slugify(post["title"])  # Maqola sarlavhasi asosida slug yaratish

@app.route("/")
def home():
    return render_template("home.html")


@app.route('/blog')
def blog():
    return render_template('blog.html', blog_posts=blog_posts)

@app.route('/formIndex')
def logIn():
      return render_template('login.html')
@app.route('/article/<slug>')
def article(slug):
    for year in blog_posts:
        for month in year["months"]:
            for post in month["posts"]:
                if post["slug"] == slug:  # Slug orqali postni topamiz
                    return render_template('article.html', article=post)  # Faqat bitta postni jo‘natamiz
    return "Maqola topilmadi", 404



@app.route('/about')
def about():
      return render_template('aboutMe.html')
@app.route("/jsonblog")
def jsonBolog():
      return blog_posts[0]['months']

@app.route('/add_post', methods=['POST'])
def add_post():
    if not request.is_json:
        return jsonify({"error": "Content-Type application/json bo‘lishi kerak"}), 415
    
    data = request.get_json()
    year = data.get("year")
    month = data.get("month")
    new_post = {
        "date": data.get("date"),
        "title": data.get("title"),
        "author": data.get("author"),
        "url": data.get("url"),
        "slug": slugify(data.get("title")),
        "content": data.get("content") 
        
    }

    if not all([year, month, new_post["date"], new_post["title"], new_post["author"], new_post["url"]]):
        return jsonify({"error": "Barcha maydonlar to‘ldirilishi shart!"}), 400

    # Blog postni tegishli yil va oyga qo‘shish
    for year_entry in blog_posts:
        if year_entry["year"] == year:
            for month_entry in year_entry["months"]:
                if month_entry["month"] == month:
                    month_entry["posts"].append(new_post)
                    return jsonify({"message": "Post qo‘shildi!", "post": new_post}), 201
            
            # Agar oy topilmasa, yangi oy yaratib qo‘shish
            year_entry["months"].append({
                "month": month,
                "posts": [new_post]
            })
            return jsonify({"message": "Yangi oy yaratildi va post qo‘shildi!", "post": new_post}), 201

    # Agar yil ham topilmasa, yangi yil yaratish
    blog_posts.append({
        "year": year,
        "months": [
            {
                "month": month,
                "posts": [new_post]
            }
        ]
    })
    return jsonify({"message": "Yangi yil yaratildi va post qo‘shildi!", "post": new_post}), 201




if __name__ == "__main__":
    app.run(port=4200, debug=True)
    