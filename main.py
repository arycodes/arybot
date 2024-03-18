from dotenv import load_dotenv
import os
import google.generativeai as genai



from flask import Flask, render_template, request, redirect, url_for, session ,send_from_directory
load_dotenv()  # Load environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

app = Flask(__name__)
app.secret_key = "new"

@app.route('/assets/logo.png')
def get_logo():
    return send_from_directory('static', 'icon_trans.png')

@app.route('/images/<path:filename>')
def send_image(filename):
    return send_from_directory('static', filename)

def get_gemini_response(question):
    response = chat.send_message(question, stream=False)
    return response


@app.route('/', methods=['GET', 'POST'])
def chat_route():
    if 'chat_history' not in session:
        session['chat_history'] = []

    if request.method == 'POST':
        user_input = request.form["user_input"]
        response = get_gemini_response(user_input)

        # print("Bot: ", end="")
        # for chunk in response:
        #     print(chunk., end="")
        # print()

        chat_history = session["chat_history"]

        chat_history.append(["You", user_input])  # This is a list
        for chunk in response:
            chat_history.append(["Ary", chunk.text])  # This appends lists to chat_history

        
        session['chat_history'] = chat_history

        return redirect(url_for("chat_route"))  # Redirect to the chat route itself
    else:
        chat_history = session['chat_history']
        # for entry in chat_history:
        #     if entry[0].strip().lower()=="bot":
        #         entry[1]=markdown2.markdown(entry[1])
        return render_template("index.html", data=chat_history)



@app.route('/reset')
def reset():
    session['chat_history'] = []
    return redirect(url_for("chat_route"))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
