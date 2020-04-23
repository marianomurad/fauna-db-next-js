const faunadb = require('faunadb')

// your secret hash
const secret = process.env.faunadb_secret_key
const q = faunadb.query
const client = new faunadb.Client({ secret })

module.exports = async (req, res) => {
        await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('all_customers') // specify source
                    )
                ),
                ref => q.Get(ref) // lookup each result by its reference
            )
        ).then(dbs => dbs).then(dbs => res.status(200).json(dbs.data)).catch(e => res.status(500).json({ error: e.message }))
}
