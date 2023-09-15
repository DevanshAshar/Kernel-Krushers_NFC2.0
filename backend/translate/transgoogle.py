from googletrans import Translator

# Create a Translator object with a specified user-agent
translator = Translator(user_agent="Mozilla/5.0")

# Text to translate
text_to_translate = "આજના ચોંકાવનારા સમાચાર કોલેજના એક વિદ્યાર્થીને નાસાની મુલાકાત લેવાની તક મળી"

# Translate text to English
translated = translator.translate(text_to_translate,dest='en')

# Get the translated text
translated_text = translated.text

print(f"Original text: {text_to_translate}")
print(f"Translated text: {translated_text}")
