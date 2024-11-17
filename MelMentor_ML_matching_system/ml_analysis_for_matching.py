import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('student_profiles.csv')
print("Columns in the CSV file:", df.columns)

# Function to clean major names from 'Science'
def clean_major(major):
    return major.replace(' Science', '').strip().lower()

# Create separate features for major and interests
df['major_feature'] = df['major'].apply(clean_major)
df['interest_feature'] = df['academic_interests'] + ' ' + df['hobbies']

mentees = df[df['class_year'] == df['class_year'].max()]
mentors = df[df['class_year'] < df['class_year'].max()]

# Create TF-IDF vectors for interests and majors
tfidf_interests = TfidfVectorizer(stop_words='english')
tfidf_majors = TfidfVectorizer()

mentee_interest_vectors = tfidf_interests.fit_transform(mentees['interest_feature'])
mentor_interest_vectors = tfidf_interests.transform(mentors['interest_feature'])

mentee_major_vectors = tfidf_majors.fit_transform(mentees['major_feature'])
mentor_major_vectors = tfidf_majors.transform(mentors['major_feature'])

# Calculate cosine similarity for interests and majors
interest_similarity = cosine_similarity(mentee_interest_vectors, mentor_interest_vectors)
major_similarity = cosine_similarity(mentee_major_vectors, mentor_major_vectors)

# Combine similarities with weights (e.g., 80% major, 20% interests)
combined_similarity = 0.8 * major_similarity + 0.2 * interest_similarity

def find_best_mentor(mentee_index):
    mentor_scores = combined_similarity[mentee_index]
    best_match_index = np.argmax(mentor_scores)
    best_mentor = mentors.iloc[best_match_index]
    similarity_score = mentor_scores[best_match_index]

    if mentees.iloc[mentee_index]['major_feature'] != best_mentor['major_feature']:
        print(
            f"Note: {mentees.iloc[mentee_index]['Full_name']} ({mentees.iloc[mentee_index]['major_feature']}) matched with {best_mentor['Full_name']} ({best_mentor['major_feature']}) due to combined similarity.")

    return best_mentor['Full_name'], float(similarity_score), best_mentor['major']

mentor_matches = []
for i in range(len(mentees)):
    best_mentor, similarity_score, mentor_major = find_best_mentor(i)
    mentor_matches.append({
        'Mentee': mentees.iloc[i]['Full_name'],
        'Mentee Major': mentees.iloc[i]['major'],
        'Mentor': best_mentor,
        'Mentor Major': mentor_major,
        'Similarity Score': similarity_score
    })

matches_df = pd.DataFrame(mentor_matches)

sorted_matches = matches_df.sort_values('Similarity Score', ascending=False)

pd.set_option('display.max_columns', None)
print(sorted_matches)

sorted_matches.to_csv('mentor_matches.csv', index=False)
print("Mentor matches have been saved to 'mentor_matches.csv'")