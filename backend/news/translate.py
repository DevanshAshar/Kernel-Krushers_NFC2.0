from easygoogletranslate import EasyGoogleTranslate

def google_translate(text):
    translator = EasyGoogleTranslate()
    result = translator.translate(text, target_language='en')

    return result