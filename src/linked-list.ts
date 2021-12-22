'use strict'

import { Node } from './node'

export class LinkedList<T> {
  /**
   * Contains the items in the set.
   */
  private readonly meta: {
    head?: Node<T>
  }

  /**
   * Create a new set instance.
   *
   * @param items
   */
  constructor (...values: T[]) {
    this.meta = {}

    this.push(...values)
  }

  /**
   * Create a new linked list instance from the given `values`.
   *
   * @param {Iterable} values
   *
   * @returns {LinkedList<T>}
   */
  static from<T> (...values: T[]): LinkedList<T> {
    return new this(...values)
  }

  /**
   * Returns the head node.
   *
   * @returns {Node<T> | undefined}
   */
  head (): Node<T> | undefined {
    return this.meta.head
  }

  /**
   * Determine whether a head node is missing.
   *
   * @returns {Boolean}
   */
  isMissingHead (): boolean {
    return !this.head()
  }

  /**
   * Determine whether this linked list is empty.
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.isMissingHead()
  }

  /**
   * Determine whether this linked list is not empty.
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Insert the given `values` at the end of the list.
   *
   * @param {T[]} values
   *
   * @returns {this}
   */
  push (...values: T[]): this {
    ([] as T[])
      .concat(...values)
      .forEach(value => {
        const node = Node.create(value)

        this.isMissingHead()
          ? this.meta.head = node
          : this.head()!.setNext(node)
      })

    return this
  }

  /**
   * Transforms this linked list into an array.
   *
   * @returns {T[]}
   */
  toArray (): T[] {
    const values: T[] = []
    let node = this.head()

    while (node) {
      values.push(node.value())
      node = node.next()
    }

    return values
  }
}
