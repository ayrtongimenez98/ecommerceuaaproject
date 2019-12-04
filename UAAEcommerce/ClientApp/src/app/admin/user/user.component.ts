import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { UserModel } from '../../models/user.model';
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading: boolean = false;
  users: Array<UserModel> = [];
  displayedColumns: string[] = ['id', 'username', 'document', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource(null);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly userService: UserService,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.userService.users().subscribe(x => {
      this.users = x;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteUser(userId: string){
    this.loading = true;
    this.userService.deleteUserById(userId).subscribe(x => {
      if (!x.success){
        this.snackBar.open(x.message? "" : "Ocurrio un error.");
        this.loading = false;
      }else{
        const index = this.users.findIndex(x => x.id === userId);
        this.users.splice(index, 1);
        this.dataSource.data = this.users;
        this.loading = false;
        this.snackBar.open(x.message);
      }
    })
  }
}
