import fs from 'fs';
import os from 'os';
import path from 'path';
import nock from 'nock';
import loadPage from '../src';

test('page-loader', async () => {
  const tmpdir = os.tmpdir();
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__/index.html'), 'utf8');

  nock('http://hexlet.io')
    .get('/courses')
    .reply(200, expected);

  await loadPage('http://hexlet.io/courses', tmpdir);

  const result = fs.readFileSync(path.join(tmpdir, 'hexlet-io-courses.html'), 'utf8');
  expect(result).toMatch(expected);
});
