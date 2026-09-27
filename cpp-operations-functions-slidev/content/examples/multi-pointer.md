```c
void getMinMax(int a, int b, int* lo, int* hi)
{
    *lo = a < b ? a : b;
    *hi = a < b ? b : a;
}

int lo, hi;
getMinMax(3, 8, &lo, &hi); // 传入地址
```
