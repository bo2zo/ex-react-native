import React, { useEffect, useState } from 'react';
import { View, Text,SafeAreaView ,TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function DataComponent() {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://192.168.1.67:5000/getData')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

const handleSignup = () => {
  const job_id = selectedJob ? (selectedJob.id || selectedJob.job_id) : null;
  fetch('http://192.168.1.67:5000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, job_id }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
};


  const handleTitleClick = (item) => {
    setSelectedJob({ ...item, job_id: item.job_id });
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titreEmploi}>Offres d'emploi</Text>
      <View style={styles.jobContainer}>
      {data.map(item => (
        <View style={styles.jobCard} key={item.id}>
          <TouchableOpacity onPress={() => handleTitleClick(item)}>
            <Text style={styles.jobTitle}>{item.title}</Text>
          </TouchableOpacity>
          <Text style={styles.jobDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.postulerButton} onPress={() => { setSelectedJob(item); setShowPopup(true); }}>
            <Text style={styles.postulerButtonText}>Postuler</Text>
          </TouchableOpacity>
        </View>
      ))}
      </View>
      {showPopup && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Postuler</Text>
          <Text>Vous pouvez postuler pour <Text style={styles.selectedJobTitle}>{selectedJob?.title}</Text></Text>
          <Text>Dans la compagnie <Text style={styles.selectedJobCompany}>{selectedJob?.company}</Text></Text>
          <Text>Date de publication de l'offre : <Text style={styles.selectedJobDate}>{selectedJob?.date}</Text></Text>
          
          <SafeAreaView>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
        </SafeAreaView>
          <SafeAreaView>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </SafeAreaView>
          <SafeAreaView>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </SafeAreaView>
          <TouchableOpacity style={styles.button} onPress={handleSignup} type="submit">
            <Text style={styles.signupButtonText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItem: 'center',
  },
  titreEmploi: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jobContainer: {
    width: '100%',
  },
  jobCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobDescription: {
    marginBottom: 8,
  },
  postulerButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  postulerButtonText: {
    color: 'white',
  },
  popup: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: '80%',
    backgroundColor: '#e5dae5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedJobTitle: {
    fontWeight: 'bold',
  },
  selectedJobCompany: {
    fontStyle: 'italic',
  },
  selectedJobDate: {
    fontStyle: 'italic',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#00000',
    fontWeight: 'bold',
  },
});

export default DataComponent;
