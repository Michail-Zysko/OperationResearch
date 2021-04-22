import { AddPoint } from './Point/AddPoint.js';
import { RemovePoint } from './Point/RemovePoint.js';

'use strict';

Draw.addEventListener("click", AddPoint);
Body.addEventListener("contextmenu", RemovePoint);