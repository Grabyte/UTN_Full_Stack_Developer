import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CharactersComponent } from "./pages/characters/characters.component";
import { ContactComponent } from "./pages/contact/contact.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "characters", component: CharactersComponent },
  { path: "contact", component: ContactComponent },
]