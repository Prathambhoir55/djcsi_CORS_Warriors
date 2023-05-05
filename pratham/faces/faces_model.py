import face_recognition

known_image = face_recognition.load_image_file("profile_pic.jpeg")
chirag_image = face_recognition.load_image_file("chirag.jpg")
unknown_image = face_recognition.load_image_file("test.jpg")

known_encoding = face_recognition.face_encodings(known_image, model="small")[0]
print(len(known_encoding))
chirag_encoding = face_recognition.face_encodings(chirag_image, model="small")[0]
print(chirag_encoding)
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
print(unknown_encoding)

results = face_recognition.compare_faces([known_encoding, chirag_encoding], unknown_encoding)
print(results)