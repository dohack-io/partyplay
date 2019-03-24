import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { BehaviorSubject, interval } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-current-song',
  templateUrl: './current-song.component.html',
  styleUrls: ['./current-song.component.scss']
})
export class CurrentSongComponent implements OnInit {

  public currentSong: any;

  constructor(
    private songService: SongService
  ) { }

  ngOnInit() {
    this.songService.getCurrentSong().pipe(
      map(x => this.currentSong = x && x.item)
    ).subscribe(() => {
      console.log('first', this.currentSong);
    });
    interval(5000).pipe(
      concatMap(() => this.songService.getCurrentSong()),
      map(x => this.currentSong = x && x.item)
    ).subscribe(() => {
      console.log(this.currentSong);
    });
  }
}
