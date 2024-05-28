import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  action = 'add';
  listFilm: phim[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllFilms();
  }

  tieude = '';
  soluongtap = '';
  phathanh = '';
  mieuta = '';
  lichchieu = '';

  getAllFilms() {
    this.http.get('http://localhost:2304/phim').subscribe((data) => {
      this.listFilm = data as phim[];
    });
  }


  addFilm() {
    const newFilm = {
      tieude: this.tieude,
      soluongtap: this.soluongtap,
      phathanh: this.phathanh,
      mieuta: this.mieuta,
      lichchieu: this.lichchieu,  
    };
    this.http
      .post('http://localhost:2304/phim', newFilm)
      .subscribe((data) => {});
    this.clear();
  }

  updateFilm() {
    const newFilm = {
      tieude: this.tieude,
      soluongtap: this.soluongtap,
      phathanh: this.phathanh,
      mieuta: this.mieuta,
      lichchieu: this.lichchieu,
    };
    this.http
      .put('http://localhost:2304/phim/' + this.tieude, newFilm)
      .subscribe((data) => {});
    this.clear();
    
  }

  deleteFilm(tieude: string) {
    this.http
      .delete('http://localhost:2304/phim/' + tieude)
      .subscribe((data) => {});
  }

  editFilm(phim: phim) {
    this.tieude = phim.tieude;
    this.soluongtap = phim.soluongtap.toString();
    this.phathanh = phim.phathanh;
    this.mieuta = phim.mieuta;
    this.lichchieu = phim.lichchieu;
    this.action = 'update';
  }

  clear() {
    this.tieude = '';
    this.soluongtap = '';
    this.phathanh = '';
    this.mieuta = '';
    this.lichchieu = '';
    this.action = 'add';
  }
}

export interface phim {
  tieude: string;
  soluongtap: number;
  phathanh: string;
  mieuta: string;
  lichchieu: string;

}
