import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  /* private apikeyYoutube     = 'AIzaSyBHLZzytcylRRpuFepi2mHyMD3Ede-r7-s';
  private playlist   = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
 */
 private apikeyYoutube     = `${environment.apikeyYoutube}`;
  private playlist   = `${environment.playlist}`;
  private nextPageToken = '';

  constructor( private http: HttpClient ) { }

  getVideos() {
  
    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
        .set('part', 'snippet')
        .set('maxResults', '2')
        .set('playlistId', this.playlist )
        .set('key', this.apikeyYoutube )
        .set('pageToken', this.nextPageToken )

    return this.http.get<YoutubeResponse>( url, { params } )
              .pipe(
                
                map( resp => {
                  this.nextPageToken = resp.nextPageToken;
                   // console.log('nextPageToken', resp.nextPageToken)
                  return resp.items;
                }),

                map( items => items.map( video => video.snippet ) )

              )

  }
}
