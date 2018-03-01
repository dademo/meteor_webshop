import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import SimpleSchema from 'simpl-schema';

import './main.html';

import '../imports/ui/layouts/import.js';
import '../imports/ui/pages/import.js';
import '../imports/ui/components/import.js';

import '../imports/client/comportments/import.js';

// Autoform
AutoForm.setDefaultTemplateForType('afArrayField', 'bootstrap4');
AutoForm.setDefaultTemplateForType('quickForm', 'bootstrap4');
//AutoForm.setDefaultTemplate('bootstrap4');
//SimpleSchema.debug = true;