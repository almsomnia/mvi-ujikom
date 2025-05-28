import User from "./user"
import Doctor from "./doctor"
import Nurse from "./nurse"
import FrontOffice from "./front-office"
import Pharmacist from "./pharmacist"
import Patient from "./patient"
import Medicine from "./medicine"
import MedicalRecord from "./medical-record"
import Examination from "./examination"
import Diagnose from "./diagnose"
import Prescription from "./prescription"
import MedicineTransaction from "./medicine-transaction"
import Icd from "./icd"

// SECTION: User polymorphism relationships
Doctor.hasOne(User, {
   foreignKey: "refId",
   constraints: false,
   scope: { refType: "doctor" },
})
User.belongsTo(Doctor, {
   foreignKey: "refId",
   constraints: false,
})

Nurse.hasOne(User, {
   foreignKey: "refId",
   constraints: false,
   scope: { refType: "nurse" },
})
User.belongsTo(Nurse, {
   foreignKey: "refId",
   constraints: false,
})

FrontOffice.hasOne(User, {
   foreignKey: "refId",
   constraints: false,
   scope: { refType: "frontOffice" },
})
User.belongsTo(FrontOffice, {
   foreignKey: "refId",
   constraints: false,
})

Pharmacist.hasOne(User, {
   foreignKey: "refId",
   constraints: false,
   scope: { refType: "pharmacist" },
})
User.belongsTo(Pharmacist, {
   foreignKey: "refId",
   constraints: false,
})
// !SECTION: User polymorphism relationships

Patient.hasMany(MedicalRecord, {
   foreignKey: "patientId",
   constraints: true,
})
MedicalRecord.belongsTo(Patient, {
   foreignKey: "patientId",
   constraints: true,
})

MedicalRecord.hasOne(Examination, {
   foreignKey: "medicalRecordId",
   constraints: true,
})
Examination.belongsTo(MedicalRecord, {
   foreignKey: "medicalRecordId",
   constraints: true,
})

MedicalRecord.hasOne(Diagnose, {
   foreignKey: "medicalRecordId",
   constraints: true,
})
Diagnose.belongsTo(MedicalRecord, {
   foreignKey: "medicalRecordId",
   constraints: true,
})

MedicalRecord.hasMany(Prescription, {
   foreignKey: "medicalRecordId",
   constraints: true,
})
Prescription.belongsTo(MedicalRecord, {
   foreignKey: "medicalRecordId",
   constraints: true,
})

Icd.hasMany(Diagnose, {
   foreignKey: "icdId",
   constraints: true,
})
Diagnose.belongsTo(Icd, {
   foreignKey: "icdId",
   constraints: true,
})

Medicine.hasMany(Prescription, {
   foreignKey: "medicineId",
   constraints: true,
})
Prescription.belongsTo(Medicine, {
   foreignKey: "medicineId",
   constraints: true,
})

Prescription.hasMany(MedicineTransaction, {
   foreignKey: "prescriptionId",
   constraints: true,
})
MedicineTransaction.belongsTo(Prescription, {
   foreignKey: "prescriptionId",
   constraints: true,
})

Medicine.hasMany(MedicineTransaction, {
   foreignKey: "medicineId",
   constraints: true,
})
MedicineTransaction.belongsTo(Medicine, {
   foreignKey: "medicineId",
   constraints: true,
})

Examination.belongsTo(Nurse, {
   foreignKey: "nurseId",
   constraints: true
})
Nurse.hasMany(Examination, {
   foreignKey: "nurseId",
   constraints: true
})

Diagnose.belongsTo(Doctor, {
   foreignKey: "doctorId",
   constraints: true
})
Doctor.hasMany(Diagnose, {
   foreignKey: "doctorId",
   constraints: true
})

export {
   User,
   Doctor,
   Nurse,
   FrontOffice,
   Pharmacist,
   Patient,
   Medicine,
   MedicalRecord,
   Examination,
   Diagnose,
   Prescription,
   Icd,
   MedicineTransaction,
}
