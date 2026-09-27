import example_construction from './construction.md?raw'
import example_initialization from './initialization.md?raw'
import example_required from './required.md?raw'
import example_destruction from './destruction.md?raw'
import example_raii from './raii.md?raw'
import example_defaults from './defaults.md?raw'
import example_encapsulation from './encapsulation.md?raw'
import example_process_reuse from './process-reuse.md?raw'
import example_stable_interface from './stable-interface.md?raw'
import example_inheritance from './inheritance.md?raw'
import example_reuse from './reuse.md?raw'
import example_nonvirtual from './nonvirtual.md?raw'
import example_virtual from './virtual.md?raw'
import example_pure from './pure.md?raw'
import example_dispatch from './dispatch.md?raw'
import example_factory from './factory.md?raw'
import example_virtual_dtor from './virtual-dtor.md?raw'
import example_order from './order.md?raw'

export const examples: Record<string, string> = {
  'construction': example_construction,
  'initialization': example_initialization,
  'required': example_required,
  'destruction': example_destruction,
  'raii': example_raii,
  'defaults': example_defaults,
  'encapsulation': example_encapsulation,
  'process-reuse': example_process_reuse,
  'stable-interface': example_stable_interface,
  'inheritance': example_inheritance,
  'reuse': example_reuse,
  'nonvirtual': example_nonvirtual,
  'virtual': example_virtual,
  'pure': example_pure,
  'dispatch': example_dispatch,
  'factory': example_factory,
  'virtual-dtor': example_virtual_dtor,
  'order': example_order,
}
