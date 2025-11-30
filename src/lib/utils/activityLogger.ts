import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

export type ActivityAction = 
  | 'register' 
  | 'approve' 
  | 'reject' 
  | 'role_change' 
  | 'login' 
  | 'subdomain_add' 
  | 'subdomain_delete'
  | 'member_edit'
  | 'member_delete';

interface LogActivityParams {
  userId: string;
  userName: string;
  action: ActivityAction;
  details?: Record<string, any>;
}

export const logActivity = async ({ userId, userName, action, details = {} }: LogActivityParams) => {
  try {
    await addDoc(collection(db, 'activities'), {
      userId,
      userName,
      action,
      details,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
