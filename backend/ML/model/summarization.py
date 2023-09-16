import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest

# Load English tokenizer, POS tagger, parser, etc.
nlp = spacy.load('en_core_web_sm')

# Sample text for summarization
text = """
Shilpa's reaction
“It was my business to be glamorous. People couldn't understand how I had not lost weight for 8 months after the birth of my child. But I did not want to lose weight. Also, I did not pay any attention to it. The day I decided to, I lost it in 3 months. Logon ka kaam hai kehna yar (People are conditioned to say stuff). You can't change how people think. I can't take them too seriously,” Shilpa said in the interview.

She added that filtering the constructive criticism from the trolling did allow her to feel motivated to lose the extra kilos. “I'm happy they said those things because it made me aware that ab time ho gaya (now is the time), now I should lose weight (laughs). There's a lot you can learn from in terms of feedback. I'm not talking about the negative trolling. I'm talking about the constructive criticism. There's the best of both. And you can pick and choose what you want to pay attention to,” she added in the interview.
"""

sentence_tokens = []

# Function to calculate word frequencies
def summaryy(text):
  print(text)
  def calculate_word_frequencies(text):
    doc = nlp(text)
    stopwords = list(STOP_WORDS)
    word_frequencies = {}
    for word in doc:
        if word.text.lower() not in stopwords and word.text.lower() not in punctuation:
            if word.text not in word_frequencies.keys():
                word_frequencies[word.text] = 1
            else:
                word_frequencies[word.text] += 1
    max_frequency = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] = word_frequencies[word] / max_frequency
    return word_frequencies

# Calculate sentence scores based on word frequencies
  def calculate_sentence_scores(text, word_frequencies):
      doc = nlp(text)
      sentence_tokens = [sent for sent in doc.sents]
      sentence_scores = {}
      for sent in sentence_tokens:
          for word in sent:
              if word.text.lower() in word_frequencies.keys():
                  if sent not in sentence_scores.keys():
                      sentence_scores[sent] = word_frequencies[word.text.lower()]
                  else:
                      sentence_scores[sent] += word_frequencies[word.text.lower()]
      return sentence_scores

  # Summarize the text
  def summarize(text, num_sentences):
      word_frequencies = calculate_word_frequencies(text)
      sentence_scores = calculate_sentence_scores(text, word_frequencies)
      summary = nlargest(num_sentences, sentence_scores, key=sentence_scores.get)
      return summary

  # Number of sentences to include in the summary
  select_length = int(len(list(nlp(text).sents)) * 0.2)
  # print(select_length)
  # Generate the summary
  summary = summarize(text, select_length)

  sen = " "
  # Print the summary
  for sentence in summary:
      # print(sentence,'op')
      # print(sentence.text)
      sen +=sentence.text
      
  return sen
      
print(summaryy("Mama' in Madhya Pradesh, 'Uncle' in Chhattisgarh and 'Magic' of Gehlot in Rajasthan? Read Survey The Lok Sabha elections will be held in the country in 2024. For this, the 'India' alliance of the BJP and the opposition has started preparing for the elections. Before that, the assembly elections of 5 states will be held in the month of December in the country. It includes Chhattisgarh, Rajasthan and Madhya Pradesh. All the three states are important in terms of Lok Sabha elections. Congress is in power in Chhattisgarh and Rajasthan, while BJP is in power in Madhya Pradesh. Meetings and rallies are being organized by BJP, Congress and other parties for the assembly elections to be held in the month of December. In this way, whose government will come in all the three states? A survey of this has come up"))
      