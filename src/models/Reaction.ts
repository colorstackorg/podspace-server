import mongoose, { Document, models, PopulatedDoc, Schema } from 'mongoose';

import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import { PostDocument } from './Post';
import User, { UserDocument } from './User';

export enum ReactionType {
  FIRE = 'FIRE', // 🔥
  HEART = 'HEART', // 💖
  HUNDRED = 'HUNDRED', // 💯
  LAUGH = 'LAUGH', // 😂
  SAD = 'SAD' // 😢
}

interface IReaction extends BaseModel {
  /**
   * Post that was "reacted" to.
   */
  post: PopulatedDoc<PostDocument>;

  /**
   * Type of the reaction, which corresponds to an emoji, as seen above.
   *
   * @default ReactionType.HEART
   */
  type: ReactionType;

  /**
   * User that made the reaction.
   */
  user: PopulatedDoc<UserDocument>;
}

export type ReactionDocument = Document<{}, {}, IReaction> & IReaction;

const reactionSchema: Schema<ReactionDocument> = new Schema<ReactionDocument>(
  {
    /**
     * TODO: (3.03)
     * - Create the schema for the Reactions that we'll save in the database
     * using the interface above as a reference.
     * - Delete this comment and the example field.
     * - Add comment(s) to explain your work.
     */
    post: { ref: Model.POST, required: true, type: ID },
    type: { default: ReactionType.HEART, required: true, type: String },
    user: { ref: Model.USER, required: true, type: ID}
  },
  { timestamps: true }
);

const Reaction: mongoose.Model<ReactionDocument> =
  mongoose.model<ReactionDocument>(Model.REACTION, reactionSchema);

export default Reaction;
