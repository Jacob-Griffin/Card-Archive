import Controller from '@ember/controller';
import { action } from '@ember/object';
import { generateCSV } from '../helpers/getcards';

export default class ManageController extends Controller {
  @action
  downloadCSV() {
    generateCSV();
  }
}
