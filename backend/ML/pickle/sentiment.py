import pickle

# Load the pickled classifier object
with open('ML\pickle\class.pkl', 'rb') as f:
    classifier = pickle.load(f)

# Load the pickled predictions if needed
with open('ML\pickle\predictions.pkl', 'rb') as f:
    predictions = pickle.load(f)

text = "Poll pact need of hour to defeat YSRC: Jana Sena on alliance with TDP"
def sentiment_analysis(text):
    json = {}
    # Define your new input data
    text_piece = text
    labels = ["Positive", "Negative", "Neutral"]

    # Perform zero-shot classification using the loaded classifier
    new_predictions = classifier(text_piece, labels, multi_label=False)

    # Print the predictions for the new input data
    print("New Predictions:", new_predictions)
    for i,n in enumerate(new_predictions['labels']):
        json[n] = new_predictions['scores'][i]
    return json

print(sentiment_analysis(text))