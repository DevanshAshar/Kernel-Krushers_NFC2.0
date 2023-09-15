# from easygoogletranslate import EasyGoogleTranslate

# translator = EasyGoogleTranslate(
#     source_language='gu',
#     target_language='en',
#     timeout=10
# )
# result = translator.translate('આજના ચોંકાવનારા સમાચાર કોલેજના એક વિદ્યાર્થીને નાસાની મુલાકાત લેવાની તક મળી')

# print(result) 
# # Output: Dies ist ein Beispiel.

from easygoogletranslate import EasyGoogleTranslate

translator = EasyGoogleTranslate()
result = translator.translate('ऑलटाइम हाई पर पहुंचा शेयर बाजार: सेंसेक्स ने 67,774 का स्तर छुआ, निफ्टी भी 20,173 तक पहुंचा; आज से यात्रा का IPO खुला', target_language='en')

print(result)
# Output: Bu bir örnektir.