import pickle

# Load the pickled objects from the model.pkl file
with open('ML\pickle\categorization.pkl', 'rb') as model_file:
    multinob, vecto, label = pickle.load(model_file)

# Define a function to make predictions
def predict_category(input_text):
    # Preprocess the input text using the loaded vectorizer
    vectorized = vecto.transform([input_text]).toarray()

    # Make a prediction using the loaded Multinomial Naive Bayes model
    prediction = multinob.predict(vectorized)

    # Decode the predicted label using the loaded LabelEncoder
    predicted_label = label.inverse_transform(prediction)

    return predicted_label[0]

# # Example usage
# user_input = input("Enter description: ")
# prediction = predict_category(user_input)
# print("Predicted category:", prediction)