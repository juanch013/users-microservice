import { Schema, Document } from 'mongoose';

export const DocumentFormatSchema = new Schema({
  name: { type: String, required: true },
  template: { type: String, required: true },
  companyId: { type: String, required: true },
});

export interface DocumentFormat extends Document {
  id?: string;
  name: string;
  template: string;
  companyId: string;
}