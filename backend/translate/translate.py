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
result = translator.translate('प्रभादेवीतील त्या राड्याची धास्ती, गणपती विसर्जनाला स्वागत मंडप नको, राजकीय पक्षांना पोलिसांची मनाई', target_language='en')

print(result)
# Output: Bu bir örnektir.