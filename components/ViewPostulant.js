import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ApplicationsTable() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.67:5000/getApplications')
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table des postulants</Text>
      <View style={styles.table}>
        {applications.map(application => (
          <View key={application.person_id} style={styles.row}>
            <Text style={styles.cell}>{application.last_name}</Text>
            <Text style={styles.cell}>{application.first_name}</Text>
            <Text style={styles.cell}>{application.title}</Text>
            <Text style={styles.cell}>{application.company}</Text>
            <Text style={styles.cell}>{application.description}</Text>
          </View>
        ))}
      </View>
      {selectedApplication && (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Détails du Candidat</Text>
          <Text>Nom: {selectedApplication.last_name}</Text>
          <Text>Prénom: {selectedApplication.first_name}</Text>
          <Text>Travail: {selectedApplication.title}</Text>
          <Text>Company: {selectedApplication.company}</Text>
          <Text>Description: {selectedApplication.description}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  details: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ApplicationsTable;
