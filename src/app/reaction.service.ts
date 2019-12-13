import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  emojiList = ['like', 'love', 'smile', 'angry'];
  constructor() { }
}