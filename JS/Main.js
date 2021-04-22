import { AddPoint } from './AddPoint.js';
import { RemovePoint } from './RemovePoint.js';

'use strict';

Draw.addEventListener("click", AddPoint);
Body.addEventListener("contextmenu", RemovePoint);