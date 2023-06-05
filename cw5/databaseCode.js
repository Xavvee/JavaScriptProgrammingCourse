const database = 'AGH';
const collection = 'students';

// Create a new database if it does not exist.
use(database);

// Insert some documents into the collection.
db[collection].insertMany([
    { firstName: 'Adam', lastName: 'Nowak', department: 'IET' },
    { firstName: 'Joanna', lastName: 'Lód', department: 'MS' },
    { firstName: 'Adam', lastName: 'Mickiewicz', department: 'IET' },
    { firstName: 'Ewa', lastName: 'Pierwotna', department: 'ILGIZ' },
    { firstName: 'Łukasz', lastName: 'Płot', department: 'IMIR' },
    { firstName: 'Jan', lastName: 'Kowalski', department: 'IET' },
    { firstName: 'Włodzimierz', lastName: 'Biały', department: 'IMIP' },
    { firstName: 'Adam', lastName: 'Młynarz', department: 'IET' },
    { firstName: 'Katarzyna', lastName: 'Skoczek', department: 'EAIB' },
    { firstName: 'Michał', lastName: 'Bezduszny', department: 'IMIR' }
]);

// Find all students in the IET department.
db[collection].find({ department: 'IET' });