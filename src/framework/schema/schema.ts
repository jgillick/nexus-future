import * as NexusSchema from '@nexus/schema'
import { Param1 } from '../../lib/utils'
import { createNexusSingleton } from './nexus'
import { NexusGraphQLSchema, SchemaConfig } from '@nexus/schema/dist/core'

type ConnectionPluginConfig = NonNullable<
  Param1<typeof NexusSchema.connectionPlugin>
>

type ConnectionConfig = Omit<ConnectionPluginConfig, 'nexusFieldName'>

export type SettingsInput = {
  /**
   * todo
   */
  connections?: {
    /**
     * todo
     */
    default?: ConnectionConfig | false
    // Extra undefined below is forced by it being above, forced via `?:`.
    // This is a TS limitation, cannot express void vs missing semantics,
    // being tracked here: https://github.com/microsoft/TypeScript/issues/13195
    [typeName: string]: ConnectionConfig | undefined | false
  }
}

export type SettingsData = SettingsInput

export type Schema = {
  // addToContext: <T extends {}>(
  //   contextContributor: ContextContributor<T>
  // ) => App
  queryType: typeof NexusSchema.queryType
  mutationType: typeof NexusSchema.mutationType
  objectType: typeof NexusSchema.objectType
  inputObjectType: typeof NexusSchema.inputObjectType
  enumType: typeof NexusSchema.enumType
  scalarType: typeof NexusSchema.scalarType
  unionType: typeof NexusSchema.unionType
  interfaceType: typeof NexusSchema.interfaceType
  arg: typeof NexusSchema.arg
  intArg: typeof NexusSchema.intArg
  stringArg: typeof NexusSchema.stringArg
  booleanArg: typeof NexusSchema.booleanArg
  floatArg: typeof NexusSchema.floatArg
  idArg: typeof NexusSchema.idArg
  extendType: typeof NexusSchema.extendType
  extendInputType: typeof NexusSchema.extendInputType
}

type SchemaInternal = {
  private: {
    isSchemaEmpty(): boolean
    compile: (config: SchemaConfig) => Promise<NexusGraphQLSchema>
    settings: {
      data: SettingsData
      change: (newSettings: SettingsInput) => void
    }
  }
  public: Schema
}

export function create(): SchemaInternal {
  const {
    queryType,
    mutationType,
    objectType,
    inputObjectType,
    enumType,
    scalarType,
    unionType,
    interfaceType,
    arg,
    intArg,
    stringArg,
    booleanArg,
    floatArg,
    idArg,
    extendType,
    extendInputType,
    makeSchema,
    __types,
  } = createNexusSingleton()

  type State = {
    settings: SettingsData
  }

  const state: State = {
    settings: {},
  }

  const api: SchemaInternal = {
    private: {
      isSchemaEmpty: () => {
        return __types.length === 0
      },
      compile: c => {
        c.plugins = c.plugins ?? []
        c.plugins.push(...processConnectionsConfig(state.settings))
        return makeSchema(c)
      },
      settings: {
        data: state.settings,
        change(newSettings) {
          if (newSettings.connections) {
            state.settings.connections = state.settings.connections ?? {}
            const { types, ...connectionPluginConfig } = newSettings.connections
            if (types) {
              state.settings.connections.types =
                state.settings.connections.types ?? {}
              Object.assign(state.settings.connections.types, types)
            }
            Object.assign(state.settings.connections, connectionPluginConfig)
          }
        },
      },
    },
    public: {
      queryType,
      mutationType,
      objectType,
      inputObjectType,
      enumType,
      scalarType,
      unionType,
      interfaceType,
      arg,
      intArg,
      stringArg,
      booleanArg,
      floatArg,
      idArg,
      extendType,
      extendInputType,
    },
  }

  return api
}

/**
 * Process the schema connection settings into nexus schema relay connection
 * plugins.
 */
function processConnectionsConfig(
  settings: SettingsInput
): NexusSchema.core.NexusPlugin[] {
  if (settings.connections === undefined) {
    return [defaultConnectionPlugin({})]
  }

  const instances: NexusSchema.core.NexusPlugin[] = []
  const {
    default: defaultTypeConfig,
    ...customTypesConfig
  } = settings.connections

  for (const [name, config] of Object.entries(customTypesConfig)) {
    if (config) {
      instances.push(
        NexusSchema.connectionPlugin({
          nexusFieldName: name,
          ...config,
        })
      )
    }
  }

  if (defaultTypeConfig) {
    instances.push(defaultConnectionPlugin(defaultTypeConfig))
  }

  return instances
}

function defaultConnectionPlugin(
  configBase: ConnectionConfig
): NexusSchema.core.NexusPlugin {
  return NexusSchema.connectionPlugin({
    ...configBase,
    nexusFieldName: 'connection',
  })
}
