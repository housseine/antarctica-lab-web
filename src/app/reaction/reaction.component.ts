import { Component, OnInit, Input } from '@angular/core';
import { ReactionService } from '../reaction.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {
  @Input() itemId: string;

  showEmojis = false;
  emojiList: string[];
  reactionCount: any;
  userReaction: any;
  subscription: any;
  constructor(private reactionSvc: ReactionService) { }

  ngOnInit() {
    this.emojiList = this.reactionSvc.emojiList
  }

  react(val) {
    if (this.userReaction === val) {
      // this.reactionSvc.removeReaction(this.itemId)
    } else {
      // this.reactionSvc.updateReaction(this.itemId, val)
    }
  }

  toggleShow() {
    this.showEmojis = !this.showEmojis;
  }


  emojiPath(emoji) {
   return `assets/images/reactions/${emoji}.svg`;
  }

  hasReactions(index) {
   // return _.get(this.reactionCount, index.toString())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


