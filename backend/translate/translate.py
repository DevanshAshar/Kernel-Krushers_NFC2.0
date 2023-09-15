from easygoogletranslate import EasyGoogleTranslate

translator = EasyGoogleTranslate(
    source_language='gu',
    target_language='en',
    timeout=10
)
result = translator.translate('આજના ચોંકાવનારા સમાચાર કોલેજના એક વિદ્યાર્થીને નાસાની મુલાકાત લેવાની તક મળી')

print(result) 
# Output: Dies ist ein Beispiel.