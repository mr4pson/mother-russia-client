import { Injectable } from '@angular/core';
import { globals } from './../globals';

@Injectable()
export class ImageService {
    getImageURL(imageUrl) {
        return globals.baseURI+'/uploads/'+imageUrl;
    }
    getBckgndImageUrl(imageUrl) {
        return 'url('+globals.baseURI+'/uploads/'+imageUrl+')';
    }
}