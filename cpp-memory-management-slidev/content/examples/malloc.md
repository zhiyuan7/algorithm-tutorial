```c
size_t n = 3;
int* p = malloc(n * sizeof *p);
if (p != NULL) {
    p[0] = 42;
    free(p);
}
```
