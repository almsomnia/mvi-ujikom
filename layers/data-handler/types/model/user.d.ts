declare namespace Model {
   type User = {
      id: number
      name: string
      email: string
      refId: number
      createdAt: string
      updatedAt: string
   } & User.Ref

   namespace User {
      type Ref = DoctorRef | NurseRef | FrontOfficeRef | PharmacistRef
      type DoctorRef = {
         refType: "doctor"
         ref: Model.Doctor
      }
      type NurseRef = {
         refType: "nurse"
         ref: Model.Nurse
      }
      type FrontOfficeRef = {
         refType: "frontOffice"
         ref: Model.FrontOffice
      }
      type PharmacistRef = {
         refType: "pharmacist"
         ref: Model.Pharmacist
      }
   }
}