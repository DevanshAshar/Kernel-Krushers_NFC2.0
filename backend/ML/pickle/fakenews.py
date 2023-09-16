import pickle
import numpy as np
# Load the Multinomial Naive Bayes model from a file
with open('ML\pickle\multinomial_nb_model.pkl', 'rb') as model_file:
    loaded_multinob = pickle.load(model_file)

# Load the TfidfVectorizer from a file
with open('ML/pickle/tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
    loaded_vectorizer = pickle.load(vectorizer_file)

# Input from the user
def fake_detect(text):
    new = np.array([text])

    # Vectorize the input
    vectorized = loaded_vectorizer.transform(new)

    # Make predictions using the loaded model
    prediction = loaded_multinob.predict(vectorized)

    if prediction == 0:
        return 'Real'
    else:
        return 'Fake'
    
print(fake_detect('aliens invaded the earth'))