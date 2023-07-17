import Application from 'kshop-app/app';
import config from 'kshop-app/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';

setApplication(Application.create(config.APP));
QUnit.done(async function() {
    forceModulesToBeLoaded();
    await sendCoverage();
  });
setup(QUnit.assert);

start();
