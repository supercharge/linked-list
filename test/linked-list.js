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

test.run()
