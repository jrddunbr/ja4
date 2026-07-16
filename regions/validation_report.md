# MeshCore region validation

All area values are calculated in EPSG:5070 and reported in square kilometers.

| State | Area sq km | Uncovered by non-east regions sq km | Coverage |
| --- | ---: | ---: | ---: |
| CT | 12930.60 | 0.000000 | 100.000000% |
| MA | 21325.08 | 0.000000 | 100.000000% |
| ME | 85721.02 | 0.000000 | 100.000000% |
| NH | 24040.69 | 0.000000 | 100.000000% |
| RI | 2856.67 | 0.000000 | 100.000000% |
| VT | 24900.32 | 0.000000 | 100.000000% |

Adjacent-region continuity choices:
- ENY covers the Eastern New York corridor from NYC through the Hudson Valley and Albany.
- NYC, HV, and ALB are more specific overlapping regions inside ENY.
- MSV is Sullivan County and is subtracted from ENY.
- ENY stops at the ALB footprint and does not continue north into Clinton or Essex Counties.

Coverage check passed: every New England state is fully covered by at least one non-east MeshCore region.
