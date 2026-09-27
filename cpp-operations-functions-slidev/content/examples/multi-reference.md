```cpp
#include <algorithm>
void getMinMax(int a, int b, int& lo, int& hi)
{
    lo = std::min(a, b);
    hi = std::max(a, b);
}
int lo = 0, hi = 0;
getMinMax(3, 8, lo, hi); // lo = 3，hi = 8
```
