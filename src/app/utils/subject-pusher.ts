import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export function push<T>(target: Subject<T>): MonoTypeOperatorFunction<T> {
  return tap((data: T) => target.next(data));
}
