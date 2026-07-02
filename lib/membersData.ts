// Datos de miembros para TAMEFOR
export interface Member {
  id: string;
  fullName: string;
  credentialNumber: string;
  cedula: string;
  profession: string;
  email?: string;
  phone?: string;
  status: 'active' | 'inactive';
  registrationDate: string;
  category?: 'fundador' | 'honorario' | 'adherente';
  deceased?: boolean;
}

export const membersData: Member[] = [];

export function getActiveMembers(): Member[] {
  return membersData.filter(member => member.status === 'active');
}

export function getMemberByCredentialNumber(credentialNumber: string): Member | undefined {
  return membersData.find(member => member.credentialNumber === credentialNumber);
}
