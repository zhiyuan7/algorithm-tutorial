```cpp
#include <algorithm>
struct MinMax { int min; int max; };
MinMax getMinMax(int a, int b)
{
    return {std::min(a, b), std::max(a, b)};
}
auto [lo, hi] = getMinMax(3, 8); // C++17
// lo = 3，hi = 8
```
