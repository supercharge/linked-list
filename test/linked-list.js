'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { LinkedList } = require('../dist')

test('from', () => {
  expect(LinkedList.from().toArray()).toEqual([])
  expect(LinkedList.from([]).toArray()).toEqual([])

  expect(LinkedList.from(1, 1, 2, 3).toArray()).toEqual([1, 1, 2, 3])
})

test('push', () => {
  expect(LinkedList.from().push(1).toArray()).toEqual([1])
  expect(LinkedList.from([]).push(1).toArray()).toEqual([1])

  expect(LinkedList.from([1]).push(2).toArray()).toEqual([1, 2])
})

test('isEmpty', () => {
  expect(LinkedList.from().isEmpty()).toBe(true)
  expect(LinkedList.from([]).isEmpty()).toBe(true)

  expect(LinkedList.from([1]).isEmpty()).toBe(false)
  expect(LinkedList.from([]).push(1).isEmpty()).toBe(false)
  expect(LinkedList.from([]).push(null).isEmpty()).toBe(false)
})

test('isNotEmpty', () => {
  expect(LinkedList.from().isNotEmpty()).toBe(false)
  expect(LinkedList.from([]).isNotEmpty()).toBe(false)

  expect(LinkedList.from([1]).isNotEmpty()).toBe(true)
  expect(LinkedList.from([]).push(1).isNotEmpty()).toBe(true)
  expect(LinkedList.from([]).push(null).isNotEmpty()).toBe(true)
})

test('head', () => {
  expect(LinkedList.from().head()).toBeUndefined()
  expect(LinkedList.from([]).head()).toBeUndefined()

  expect(LinkedList.from(1).head().value()).toBe(1)
  expect(LinkedList.from(1, 2).head().value()).toBe(1)

  expect(LinkedList.from([1]).head().value()).toBe(1)
  expect(LinkedList.from([1, 2]).head().value()).toBe(1)
})

test('tail', () => {
  expect(LinkedList.from().tail()).toBeUndefined()
  expect(LinkedList.from([]).tail()).toBeUndefined()

  expect(LinkedList.from(1).tail().value()).toBe(1)
  expect(LinkedList.from(1, 2).tail().value()).toBe(2)
  expect(LinkedList.from(1, 2, 3).tail().value()).toBe(3)

  expect(LinkedList.from([1]).tail().value()).toBe(1)
  expect(LinkedList.from([1, 2]).tail().value()).toBe(2)
  expect(LinkedList.from([1, 2, 3]).tail().value()).toBe(3)
})

test('toArray', () => {
  const users = [
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Supercharge' }
  ]

  const list = LinkedList.from(users)
  expect(list.toArray()).toEqual(users)
})

test('nodes', () => {
  const users = [
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Supercharge' }
  ]

  const list = LinkedList.from(users)
  expect(list.nodes().length).toBe(2)
  expect(list.nodes()[0].value()).toEqual({ id: 1, name: 'Marcus' })
  expect(list.nodes()[1].value()).toEqual({ id: 2, name: 'Supercharge' })
})

test('find', () => {
  const list = LinkedList.from([
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Supercharge' }
  ])

  expect(
    list.find(node => node.value().name === 'Marcus').value()
  ).toEqual({ id: 1, name: 'Marcus' })

  expect(
    list.find(value => value.name === 'Supercharge')
  ).toBeUndefined()
})

test.run()
