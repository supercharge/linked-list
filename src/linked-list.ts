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
  constructor (...values: T[] | T[][]) {
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
  static from<T> (values: T[]): LinkedList<T>
  static from<T> (...values: T[]): LinkedList<T>
  static from<T> (...values: T[] | T[][]): LinkedList<T> {
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
   * Returns the tail node.
   *
   * @returns {Node<T> | undefined}
   */
  tail (): Node<T> | undefined {
    return this.find(node => {
      return node.isMissingNext()
    })
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
   * Returns the first item in the set matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param {Function} predicate
   *
   * @returns {*}
   */
  find (predicate: (node: Node<T>, index: number, linkedList: LinkedList<T>) => unknown): Node<T> | undefined
  find<S extends T> (predicate: (node: Node<T>, index: number, linkedList: LinkedList<T>) => node is Node<S>): S | undefined
  find (predicate: (node: Node<T>, index: number, linkedList: LinkedList<T>) => unknown): Node<T> | undefined {
    return this.nodes().find((node, index) => {
      return predicate(node, index, this)
    })
  }

  /**
   * Insert the given `values` at the end of the list.
   *
   * @param {T[]} values
   *
   * @returns {this}
   */
  push (...values: T[] | T[][]): this {
    ([] as T[])
      .concat(...values)
      .forEach(value => {
        const node = Node.create(value)

        if (this.isMissingHead()) {
          this.meta.head = node
          return
        }

        this.tail()?.setNext(node)
      })

    return this
  }

  /**
   * Transforms this linked list into an array.
   *
   * @returns {T[]}
   */
  toArray (): T[] {
    return this.nodes().map(node => {
      return node.value()
    })
  }

  /**
   * Returns a list of all nodes.
   *
   * @returns {Node<T>[]}
   */
  nodes (): Array<Node<T>> {
    const nodes: Array<Node<T>> = []
    let node = this.head()

    while (node) {
      nodes.push(node)
      node = node.next()
    }

    return nodes
  }

  /**
   * Returns a size of the linked list.
   *
   * @returns {Number}
   */
  size (): Number {
    return this.nodes().length
  }
}
