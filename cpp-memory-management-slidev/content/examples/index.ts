import example_address from './address.md?raw'
import example_array from './array.md?raw'
import example_automatic from './automatic.md?raw'
import example_dynamic from './dynamic.md?raw'
import example_malloc from './malloc.md?raw'
import example_new from './new.md?raw'
import example_pointer from './pointer.md?raw'
import example_raii from './raii.md?raw'
import example_risk from './risk.md?raw'
import example_scope from './scope.md?raw'
import example_shared from './shared.md?raw'
import example_static from './static.md?raw'
import example_struct from './struct.md?raw'
import example_unique from './unique.md?raw'

export const examples: Record<string, string> = {
  'address': example_address,
  'array': example_array,
  'automatic': example_automatic,
  'dynamic': example_dynamic,
  'malloc': example_malloc,
  'new': example_new,
  'pointer': example_pointer,
  'raii': example_raii,
  'risk': example_risk,
  'scope': example_scope,
  'shared': example_shared,
  'static': example_static,
  'struct': example_struct,
  'unique': example_unique,
}
