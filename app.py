from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()  # Load environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])


def get_gemini_response(question):
    response = chat.send_message(question, stream=False)
    return response


print("Gemini LLM Application")

chat_history = []

while True:
    user_input = input("You: ")
    if user_input.lower() == 'quit':
        break

    response = get_gemini_response(user_input)

    print("Bot: ", end="")
    for chunk in response:
        print(chunk.text, end="")
    print()

    # Append to chat history
    chat_history.append(("You", user_input))
    for chunk in response:
        chat_history.append(("Bot", chunk.text))

# Print chat history
print("Chat History:")
for role, text in chat_history:
    print(f"{role}: {text}")
